import { getImageUrl, stripHtmlTags, truncateText } from './helpers';
import { expect, describe, it } from 'vitest';

describe('getImageUrl', () => {
  it('should return the image url', () => {
    const imageUrl = getImageUrl('https://www.example.com/image.jpg');
    expect(imageUrl).toBe('https://www.example.com/image.jpg');
  });

  it('should return the default image url', () => {
    const imageUrl = getImageUrl();
    expect(imageUrl).toBe('https://placehold.co/210x295');
  });

  it('should return the default image url with custom text', () => {
    const imageUrl = getImageUrl(undefined, 'customtext');
    expect(imageUrl).toBe('https://placehold.co/210x295?text=customtext');
  });
});

describe('stripHtmlTags', () => {
  it('should remove html tags from a string', () => {
    const text = stripHtmlTags('<p>hello world</p>');
    expect(text).toBe('hello world');
  });
});

describe('truncateText', () => {
  it('should truncate the text', () => {
    const text = truncateText('hello world', 5);
    expect(text).toBe('hello...');
  });
});
