// Generate 30 Data Tamu Hotel (Guests)
export const guestsData = Array.from({ length: 30 }).map((_, index) => ({
    id: `GST-${1000 + index}`,
    name: `Guest ${index + 1}`,
    email: `guest${index + 1}@gmail.com`,
    phone: `081234567${index.toString().padStart(3, '0')}`,
    status: index % 5 === 0 ? "VIP" : index % 2 === 0 ? "Member" : "Regular"
}));

// Generate 30 Data Reservasi (Bookings)
const roomTypes = ["Standard Room", "Deluxe Room", "Executive Suite"];
const statuses = ["Confirmed", "Checked-In", "Checked-Out", "Cancelled"];

export const bookingsData = Array.from({ length: 30 }).map((_, index) => ({
    id: `BKG-2026${index.toString().padStart(3, '0')}`,
    guestName: `Guest ${Math.floor(Math.random() * 30) + 1}`,
    roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
    checkIn: `2026-05-${(index % 28 + 1).toString().padStart(2, '0')}`,
    status: statuses[Math.floor(Math.random() * statuses.length)]
}));