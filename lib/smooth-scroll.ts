// @note smooth scroll utility for navigating to sections

// @note scrolls to element and centers it in viewport, updates URL hash
export function scrollToSection(targetId: string, updateHash = true) {
  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (updateHash) {
      history.pushState(null, '', '/');
    }
    return;
  }

  const element = document.getElementById(targetId);
  if (!element) return;

  const elementRect = element.getBoundingClientRect();
  const elementHeight = elementRect.height;
  const windowHeight = window.innerHeight;

  // @note calculate offset to center element (or show from top if too tall)
  const offset = elementHeight < windowHeight
    ? (windowHeight - elementHeight) / 2
    : 100;

  const targetPosition = element.offsetTop - offset;
  window.scrollTo({ top: targetPosition, behavior: 'smooth' });

  // @note update URL hash without triggering scroll
  if (updateHash) {
    history.pushState(null, '', `#${targetId}`);
  }
}

// @note handles click event for anchor links
export function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const targetId = href.replace('#', '');
  scrollToSection(targetId);
}

// @note handles initial page load with hash - call this in useEffect
export function handleInitialHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash && hash !== 'home') {
    // @note small delay to ensure DOM is ready and measurements are accurate
    setTimeout(() => {
      scrollToSection(hash, false);
    }, 100);
  }
}
