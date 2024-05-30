export function stripHtmlTags(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export function truncateText(text: string, length: number) {
  return text.length > length ? text.slice(0, length) + '...' : text;
}

export function getImageUrl(url?: string, placeholder?: string) {
  if (url) return url;

  return `https://placehold.co/210x295${
    placeholder ? `?text=${placeholder}` : ''
  }`;
}
