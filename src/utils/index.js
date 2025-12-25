
export const getDateDifferenceFromNow = (fromDate) => {

    const start = new Date(fromDate)
    const end = new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = (end.getMonth() + 12 * end.getFullYear()) - (start.getMonth() + 12 * start.getFullYear());

    const diffInMs = Math.abs(end - start);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffInMs / (1000 * 60));

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }

    if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    return "Just now";
}