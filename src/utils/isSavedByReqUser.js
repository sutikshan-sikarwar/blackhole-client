export const isSavedByReqUser = (reqUserId, post) => {
    // Check if post and post.saved are defined
    if (!post || !Array.isArray(post.saved)) {
        return false; // Return false if post or saved is undefined or not an array
    }

    for (let user of post.saved) {
        if (user && reqUserId === user.id) {
            return true; // Return true if a match is found
        }
    }
    return false; // Return false if no match is found
}
