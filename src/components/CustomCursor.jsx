import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const pos       = useRef({ x: -100, y: -100 });
  const ringPos   = useRef({ x: -100, y: -100 });
  const rafRef    = useRef(null);
  const isHovered = useRef(false);

  useEffect(function() {

    // ── Move dot instantly ──
    function onMouseMove(e) {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX - 3 + 'px';
        dotRef.current.style.top  = e.clientY - 3 + 'px';
      }
    }

    // ── Ring lerps with physics ──
    function animateRing() {
      var dx = pos.current.x - ringPos.current.x;
      var dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.09;
      ringPos.current.y += dy * 0.09;

      if (ringRef.current) {
        var size = isHovered.current ? 52 : 32;
        ringRef.current.style.left = ringPos.current.x - size / 2 + 'px';
        ringRef.current.style.top  = ringPos.current.y - size / 2 + 'px';
      }
      rafRef.current = requestAnimationFrame(animateRing);
    }

    // ── Expand on interactive elements ──
    function onEnterLink() {
      isHovered.current = true;
      if (ringRef.current) {
        ringRef.current.style.width        = '52px';
        ringRef.current.style.height       = '52px';
        ringRef.current.style.borderColor  = 'rgba(184,115,51,0.7)';
        ringRef.current.style.background   = 'rgba(184,115,51,0.04)';
        ringRef.current.style.mixBlendMode = 'normal';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity       = '0';
      }
    }

    function onLeaveLink() {
      isHovered.current = false;
      if (ringRef.current) {
        ringRef.current.style.width        = '32px';
        ringRef.current.style.height       = '32px';
        ringRef.current.style.borderColor  = 'rgba(184,115,51,0.45)';
        ringRef.current.style.background   = 'transparent';
        ringRef.current.style.mixBlendMode = 'normal';
      }
      if (dotRef.current) {
        dotRef.current.style.opacity       = '1';
      }
    }

    // ── Press effect ──
    function onMouseDown() {
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(0.82)';
        ringRef.current.style.borderColor = 'rgba(184,115,51,0.9)';
      }
    }

    function onMouseUp() {
      if (ringRef.current) {
        ringRef.current.style.transform = 'scale(1)';
        ringRef.current.style.borderColor = isHovered.current
          ? 'rgba(184,115,51,0.7)'
          : 'rgba(184,115,51,0.45)';
      }
    }

    // ── Hide when leaving window ──
    function onMouseLeave() {
      if (dotRef.current)  dotRef.current.style.opacity  = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    }

    function onMouseEnter() {
      if (dotRef.current)  dotRef.current.style.opacity  = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    }

    // ── Attach to interactive elements ──
    function attachListeners() {
      var els = document.querySelectorAll(
        'a, button, input, textarea, select, label, [role="button"], .card, .bento-tile'
      );
      els.forEach(function(el) {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
      return els;
    }

    window.addEventListener('mousemove',    onMouseMove);
    window.addEventListener('mousedown',    onMouseDown);
    window.addEventListener('mouseup',      onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    var els;
    var attachTimer = setTimeout(function() {
      els = attachListeners();
    }, 800);

    // Re-attach on route changes
    var reattachTimer = setInterval(function() {
      if (els) {
        els.forEach(function(el) {
          el.removeEventListener('mouseenter', onEnterLink);
          el.removeEventListener('mouseleave', onLeaveLink);
        });
      }
      els = attachListeners();
    }, 3000);

    rafRef.current = requestAnimationFrame(animateRing);

    return function() {
      window.removeEventListener('mousemove',    onMouseMove);
      window.removeEventListener('mousedown',    onMouseDown);
      window.removeEventListener('mouseup',      onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(attachTimer);
      clearInterval(reattachTimer);
      if (els) {
        els.forEach(function(el) {
          el.removeEventListener('mouseenter', onEnterLink);
          el.removeEventListener('mouseleave', onLeaveLink);
        });
      }
    };
  }, []);

  return (
    <>
      {/* Copper dot — instant */}
      <div
        ref={dotRef}
        style={{
          position:      'fixed',
          width:         6,
          height:        6,
          background:    '#B87333',
          borderRadius:  '50%',
          pointerEvents: 'none',
          zIndex:        99999,
          transition:    'opacity 0.2s ease',
        }}
      />

      {/* Hollow ring — lagging */}
      <div
        ref={ringRef}
        style={{
          position:      'fixed',
          width:         32,
          height:        32,
          border:        '1px solid rgba(184,115,51,0.45)',
          borderRadius:  '50%',
          pointerEvents: 'none',
          zIndex:        99998,
          transition:
            'width 0.35s cubic-bezier(0.16,1,0.3,1), ' +
            'height 0.35s cubic-bezier(0.16,1,0.3,1), ' +
            'border-color 0.3s ease, ' +
            'background 0.3s ease, ' +
            'transform 0.2s ease, ' +
            'opacity 0.2s ease',
        }}
      />
    </>
  );
}