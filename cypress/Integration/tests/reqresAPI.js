describe('reqresApi Test', () => {
    const baseURL = "https://reqres.in";
    it('GetStatus', () => {
        cy.request({
            method:'GET',
            url: baseURL+'/api/users?page=2',
            headers:{
                'content-Type': 'application/json'
            },
            timeout:120000

        }).then((response)=>{
            expect(response.status).to.eq(200)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
        })
    });

    it('GetSingleUser',()=>{
        cy.request({
            method:'GET',
            url:baseURL+'/api/users/2',
            header:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('SingleUserNotFound', () => {
        cy.request({
            method:'GET',
            url:baseURL+'/api/users/23',
            header:{
                'content-Type':'application/json'
            },failOnStatusCode: false,
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(404)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
        })
    });

    it('List', () => {
        cy.request({
            method:'GET',
            url: baseURL+'/api/unknown',
            header:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('single resource', () => {
        cy.request({
            method:'GET',
            url:baseURL+'/api/unknown/2',
            header:{
                'content-Type':'application/json'

            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    });

    it('SingleResource not found', () => {
        cy.request({
            method:'GET',
            url:baseURL+'/api/unknown/23',
            header:{
                'content-Type':'application/json'
            },failOnStatusCode: false,
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(404)

        })
    });

    it('Create Post', () => {
        cy.request({
            method:"POST",
            url:baseURL+'/api/users',
            body:{
                "name": "morpheus",
                "job": "leader"
            },
            header:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(201)
            const bbody = JSON.stringify(response.body);
            cy.log(bbody)
        })
    });

    it('update', () => {
        cy.request({
            method:'PUT',
            url:baseURL+'/api/users/2',
            body:{
                "name": "morpheus",
                "job": "zion resident"
            },
            header:{
               'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
        
    });

    it('update Patch', () => {
        cy.request({
            method:'PATCH',
            url:baseURL+'/api/users/2',
            body:{
                "name": "morpheus",
                "job": "zion resident"
            },
            header:{
               'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
        
    });

    it('Delete', () => {
        cy.request({
            method:'DELETE',
            url:baseURL+'/api/users/2',
            header:{
               'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(204)
        })
        
    });

    it('Register sucessfully', () => {
        cy.request({
            method:"POST",
            url:baseURL+'/api/register',
            body:{
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            },
            header:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
            
        })
    });

    it('Register unsucessfully', () => {
        cy.request({
            method:"POST",
            url:baseURL+'/api/register',
            body:{
                "email": "sydney@fife"
            },failOnStatusCode: false,
            header:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(400)
            
        })
    });


    it('Login sucessfully', () => {
        cy.request({
            method:"POST",
            url:baseURL+'/api/login',
            body:{
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            },
            header:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
            
        })
    });

    it('Login unsucessfully', () => {
        cy.request({
            method:"POST",
            url:baseURL+'/api/login',
            body:{
                "email": "peter@klaven"
            },failOnStatusCode: false,
            header:{
                'content-Type':'application/json'
            },
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(400)
            
        })
    });

    it('DelayedResponse', () => {
        cy.request({
            method:'GET',
            url:baseURL+'/api/users?delay=3',
            header:{
                'content-Type':'application/json'
            },failOnStatusCode: false,
            timeout:120000
        }).then((response)=>{
            expect(response.status).to.eq(200)
            
        })
    });
});