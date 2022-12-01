import { navigate } from 'store/router';

export default function internalLink<
  T extends HTMLAnchorElement
>(node: T) {

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    const href = node.getAttribute('href');
    if (href) {
      navigate(href);
    }
  }

  node.addEventListener('click', handleClick);

  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    },
  };
}
