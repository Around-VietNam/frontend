export const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

export const pickPrimaryColor = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) {
                reject('Could not get canvas context');
                return;
            }
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const length = data.length;
            const colorCount: { [key: string]: number } = {};
            for (let i = 0; i < length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const rgb = `${r},${g},${b}`;
                if (colorCount[rgb]) {
                    colorCount[rgb]++;
                } else {
                    colorCount[rgb] = 1;
                }
            }
            const primaryColor = Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b);
            resolve(`rgb(${primaryColor})`);
        };
        img.onerror = (err) => {
            reject(err);
        };
    });
}
