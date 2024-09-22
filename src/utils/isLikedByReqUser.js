export const isLikedByReqUser = (reqUserId, post) => {
    // Check if post and post.liked are defined
    if (!post || !Array.isArray(post.liked)) {
        return false; // Return false if post or liked is undefined or not an array
    }

    // Iterate over the liked array to check if reqUserId is present
    for (let user of post.liked) {
        if (reqUserId === user.id) {
            return true; // Return true if a match is found
        }
    }
    return false; // Return false if no match is found
}
