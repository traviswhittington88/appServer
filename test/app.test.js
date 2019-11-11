const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('GET /apps', () => {   
    it('returns and array', () => { 
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {  
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.be.an('object');
                expect(app).to.have.all.keys(
                    "App", "Category", "Rating", "Reviews", "Size", "Installs", "Type", "Price", 
                    "Content Rating", "Genres", "Last Updated", "Current Ver", "Android Ver"
                );
            })
    })

    it('should be 400 if sort is incorrect', () => {    
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE'})
            .expect(400, 'Sort must be one of rating or app');

    })

    it('should return 200 if sort is correct', () => {  
        return supertest(app)
        .get('/apps')
        .query({ sort: 'rating'})
        .expect(200)
        .expect('Content-Type', /json/)
    })

    it('should sort by rating', () => { 
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {  
            let sorted = true;
            let i = 0;
            
            while(i < res.body.length - 1) {
                let appAtI = res.body[i];
                let appAtIPlus1 = res.body[i + 1];
                if(appAtIPlus1.rating < appAtI.rating) {
                    sorted = false;
                    break;
                }
                i++
            }
            expect(sorted).to.be.true;
        });
    });

});