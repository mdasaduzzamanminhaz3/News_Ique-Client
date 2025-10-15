export const formatPublishedDate = (publishedAt) => {
  if (!publishedAt) return "Unknown";

  const date = new Date(publishedAt);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return ["Today ",date.toLocaleTimeString([],  {  hour: '2-digit', minute: '2-digit' })];
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
};