import axios from 'axios'

export const  FETCH_FEATURED_PRODUCTS = 'fetch_featured_products'
const baseUrl = process.env.REACT_APP_BACKEND_API

const fetchFeaturedProducts = () => {
    const url = `${baseUrl}/featured`
    console.log(url)


  return {
    type: FETCH_FEATURED_PRODUCTS,
    payload: [
        {
        "sizes": [ ],
        "_id": "624c317b24a2f214b68e8f84",
        "name": "Oraimo FreePods-3 2Baba Edition BT5.2 Wireless Stereo Earbuds",
        "category": "Earphones & accessories",
        "description": "To enhance the afrobeat, 2baba is fully involved in the tuning process of the FreePods 3 and the sound is finely tuned to boost the punchy bass and dynamic beat. It features 2baba's voice prompt that you can hear when managing music and calls. FreePods 3 comes with 4-mic beamforming technology to track and provide high-quality voice signal. Then AI Deep Neural Network algorithm is used to reduce surrounding noise. Now your voice is crystal clear to the caller on the other end. Equipped with 13mm high sensitive drivers, FreePods 3 is specially designed for dynamic audio, incredibly powerful bass, and reproducing every music detail as artists intend. IPX5 waterproof against rain and sweat. FreePods 3 is always with you no matter what the outdoor condition is. Battery Capacity: 45mAh(earbud), 500mAh(case). Battery Life: Up to 8 hours play time / 5.5 hours talk time / Case provides additional 28 hours. Case Input:  Type-C",
        "images": [
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/794608/1.jpg?4584",
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/794608/6.jpg?3671",
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/32/794608/2.jpg?3671"
        ],
        "price": 15000,
        "__v": 0
        }
    ]
  }
}

export default fetchFeaturedProducts