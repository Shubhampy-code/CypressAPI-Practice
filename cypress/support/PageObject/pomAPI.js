class RestAPI {

    GetStatus(method,endpoint){
        cy.request({
            method:method,
            url: baseURL+endpoint,
            headers:{
                'content-Type': 'application/json'
            },
            timeout:120000

        }).then((response)=>{
            expect(response.status).to.eq(200)
            
        })
    }

    GetListOfBooks(method,endpoints){
        cy.request({
            method:method,
            url: baseURL+endpoints ,
            headers:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
        })
    }

    GetSingleBook(method,endpoints){
        cy.request({
            method:method,
            url:baseURL+endpoints,
            headers:{
                'content-Type':'application/json'
            },timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
        })
    }

    APIAuthentication(method,baseURL,endpoint,data){
        return
        cy.request({
            method:method,
            url:baseURL+endpoint,
            body:data,
            header:{
                'content-Type':'application/json'
            },failOnStatusCode: false,
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(201)
            const res = JSON.parse(JSON.stringify(response.body));
            cy.log(res);
        })
    }
}

export default RestAPI;