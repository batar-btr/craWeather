import axios from 'axios'


const getCities = async url => {
    const res = await axios.get(url);
    if (res.status !== 200) {
        throw (new Error(`Could not fetch ${url}, status: ${res.status}`))
    }

    return res;
}

export default getCities