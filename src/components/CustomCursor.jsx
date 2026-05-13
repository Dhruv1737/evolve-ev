import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // ── Move dot instantly ──
    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 5 + 'px';
        cursorRef.current.style.top  = e.clientY - 5 + 'px';
      }
    };

    // ── Follower ring lerps behind ──
    const animateFollower = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.1;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.1;
      if (followerRef.current) {
        followerRef.current.style.left = followerPos.current.x - 17 + 'px';
        followerRef.current.style.top  = followerPos.current.y - 17 + 'px';
      }
      rafRef.current = requestAnimationFrame(animateFollower);
    };

    // ── Shrink on click ──
    const onMouseDown = () => {
      cursorRef.current?.classList.add('clicking');
      followerRef.current?.style.setProperty('transform', 'scale(0.7)');
    };
    const onMouseUp = () => {
      cursorRef.current?.classList.remove('clicking');
      followerRef.current?.style.setProperty('transform', 'scale(1)');
    };

    // ── Grow on hoverable elements ──
    const onMouseEnterLink = () => {
      if (followerRef.current) {
        followerRef.current.style.width  = '56px';
        followerRef.current.style.height = '56px';
        followerRef.current.style.borderColor = 'rgba(0, 255, 65, 0.7)';
        followerRef.current.style.background  = 'rgba(0, 255, 65, 0.06)';
      }
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };
    const onMouseLeaveLink = () => {
      if (followerRef.current) {
        followerRef.current.style.width  = '34px';
        followerRef.current.style.height = '34px';
        followerRef.current.style.borderColor = 'rgba(46, 204, 55, 0.45)';
        followerRef.current.style.background  = 'transparent';
      }
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    // ── Hide when leaving window ──
    const onMouseLeave = () => {
      cursorRef.current && (cursorRef.current.style.opacity = '0');
      followerRef.current && (followerRef.current.style.opacity = '0');
    };
    const onMouseEnter = () => {
      cursorRef.current && (cursorRef.current.style.opacity = '1');
      followerRef.current && (followerRef.current.style.opacity = '1');
    };

    // ── Attach hover listeners to interactive elements ──
    const attachHoverListeners = () => {
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label, .card'
      );
      els.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
      return els;
    };

    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mouseup',    onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Attach after short delay so DOM is ready
    let els;
    const timer = setTimeout(() => { els = attachHoverListeners(); }, 500);

    rafRef.current = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mouseup',    onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
      if (els) {
        els.forEach(el => {
          el.removeEventListener('mouseenter', onMouseEnterLink);
          el.removeEventListener('mouseleave', onMouseLeaveLink);
        });
      }
    };
  }, []);

  return (
    <>
      {/* Small glowing dot */}
      <div
        ref={cursorRef}
        style={{
          width: 10,
          height: 10,
          background: '#00ff41',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'screen',
          boxShadow: '0 0 10px #00ff41, 0 0 22px rgba(0,255,65,0.5)',
          transition: 'opacity 0.2s ease, transform 0.1s ease',
        }}
      />

      {/* Lagging ring follower */}
      <div
        ref={followerRef}
        style={{
          width: 34,
          height: 34,
          border: '1px solid rgba(46, 204, 55, 0.45)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99998,
          transition:
            'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease, transform 0.15s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}