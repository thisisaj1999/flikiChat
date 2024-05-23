import React from 'react';

const useChatScroll = (dep) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const scrollToBottom = () => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    };

    const handleNodeInserted = (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    };

    if (ref.current) {
      scrollToBottom();
      ref.current.addEventListener('DOMNodeInserted', handleNodeInserted);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('DOMNodeInserted', handleNodeInserted);
      }
    };
  }, [dep]);

  return ref;
};

export { useChatScroll }
