import pomAPI
 from "../../support/PageObject/pomAPI";

 describe('POM Testing simple books API', () => {
    const baseURL = "https://simple-books-api.glitch.me";
    let randomEmail = Math.random().toString(5).substring(2);
    let token;
    let st = new pomAPI;

    it('auth', () => {
        st.APIAuthentication("POST",baseURL,"/api-clients/",{
            "clientName": "Shubham",
            "clientEmail": "shubham"+randomEmail+"@example.com"
        },token)    
    });

    it.only('', () => {
        st.APIAuthentication("POST",baseURL,"/api-clients/",{
            "clientName": "Shubham",
            "clientEmail": "shubham"+randomEmail+"@example.com"
        },token)
        it('auth', () => {
            st.GetListOfBooks("GET","/books")
            
        });
    });
 });