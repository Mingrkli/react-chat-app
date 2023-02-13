export function convertFirebaseDate(fireBaseDate) {
    let date;

    if (fireBaseDate) {
        date = new Date(fireBaseDate.seconds * 1000);
    } else {
        date = new Date();
    }

    const [month, day, year, hour, min] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
    ];

    return `${month}/${day}/${year}, ${hour}:${min} ${hour < 12 ? "AM" : "PM"}`;
}
