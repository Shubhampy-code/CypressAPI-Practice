describe('Api Test', () => {
    const baseURL = "https://simple-books-api.glitch.me";
    it('GetStatus', () => {
        cy.request({
            method:'GET',
            url: baseURL+'/status',
            headers:{
                'content-Type': 'application/json'
            },
            timeout:120000

        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    });
});