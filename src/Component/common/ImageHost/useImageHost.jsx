
const useImageHost = () => {
    const hostingKey= import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const hostingAPI=`https://api.imgbb.com/1/upload?key=${hostingKey}`

    
    return hostingAPI;
};

export default useImageHost;