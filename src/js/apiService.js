  
const objectAPI = {
    BASE_URL : 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&',
    MY_API_KYE: '21844309-0bdc8d8d935c894ec75615f09',
    query: '',
    page: 1,
    incrementPage() {
        this.page += 1;
    },

     onFetchAPI() {
         if (this.query === '') return;
         
        return fetch(`${this.BASE_URL}q=${this.query}&page=${this.page}&per_page=12&key=${this.MY_API_KYE}`)
            .then(response => { return response.json() })
            .then(({ hits })=>{
                this.incrementPage();
                return hits;
            })
            .catch(err=>{console.log(err)});
    },
};
export default objectAPI;


// onFetchAPI() {
//         if (this.query === '') return;
//     return fetch(`${this.BASE_URL}q=${this.query}&page=${this.page}&per_page=12&key=${this.MY_API_KYE}`)
//         .then(response => { return response.json() })
//     },