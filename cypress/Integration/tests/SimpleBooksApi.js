describe('Api Test', () => {
    
    const baseURL = "https://simple-books-api.glitch.me";
    let token;
    let randomEmail = Math.random().toString(5).substring(2);
    let id;
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

    it('List of books', () => {
        cy.request({
            method:'GET',
            url: baseURL+"/books" ,
            headers:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
        })
    });

    it('Get a single book', () => {
        cy.request({
            method:'GET',
            url:baseURL+"/books/1",
            headers:{
                'content-Type':'application/json'
            },timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
        })
    });

    it('API Authentication', () => {
        cy.request({
            method:'POST',
            url:baseURL+"/api-clients/",
            body:{
                "clientName": "Shubham",
                "clientEmail": "shubham"+randomEmail+"@example.com"
            },
            header:{
                'content-Type':'application/json'
            },failOnStatusCode: false,
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(201)
            const res = JSON.parse(JSON.stringify(response.body));
            token = res.accessToken;
            cy.log(token);
        })
        
    });

    it('Submit an order', () => {
        cy.request({
            method:'POST',
            url:baseURL+"/orders",
            headers:{
                'Content-Type':'application/json',
                'Authorization':"Bearer "+token,
              },body:{
                "bookId": 1,
                "customerName": "John"
              }

        }).then((response)=>{
            expect(response.status).to.eq(201)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)   
                    
        })
    });

    it('Get all orders', () => {
        cy.request({
            method:'GET',
            url: baseURL+'/orders',
            headers:{
                'content-Type':'application/json',
                'Authorization':"Bearer "+token,
            },failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
            const res = JSON.parse(JSON.stringify(response.body));
            id = res[0].id;
            cy.log(id)
        })
    });

    it('Get an order', () => {
        cy.request({
            method:"GET",
            url:baseURL+"/orders/"+id,
            headers:{
                'content-Type':'application/json',
                'Authorization':"Bearer "+token,
            },failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('Update an order', () => {
        cy.request({
            method:"PATCH",
            url:baseURL+"/orders/"+id,
            headers:{
                'content-Type':'application/json',
                'Authorization':"Bearer "+token,
            },failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(204)
        })
    });

    it('Delete an order', () => {
        cy.request({
            method:"DELETE",
            url:baseURL+'/orders/'+id,
            headers:{
                'content-Type':'application/json',
                'Authorization':"Bearer "+token,
            },failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.eq(204)
        })
    });
});