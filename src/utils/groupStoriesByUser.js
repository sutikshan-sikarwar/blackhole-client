// utils.js
export const groupStoriesByUser = (stories) => {
    const groupedStories = new Map();
    stories.forEach(story => {
      const userId = story.user.id;
      if (!groupedStories.has(userId)) {
        groupedStories.set(userId, {
          user: story.user,
          stories: []
        });
      }
      groupedStories.get(userId).stories.push(story);
    });
    return Array.from(groupedStories.values());
  };
  