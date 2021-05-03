
/*
* https://evdokimovm.github.io/javascript/nodejs/mongodb/pagination/expressjs/ejs/bootstrap/2017/08/20/create-pagination-with-nodejs-mongodb-express-and-ejs-step-by-step-from-scratch.html
* */


module.exports = {

    paginate : (options) => {

        let outputHTML = ''

        if (options.hash.current === 1) {
            outputHTML += `<li class="page-item disabled"><a class="page-link p-3 ">First</a></li>`

        }  else {
            outputHTML += `<li class="page-item"><a class="page-link p-3 " href="?page=1">First</a></li>`
        }

        // if we are not  on the first page and last page
        let i = ( Number(options.hash.current) > 5 ? Number(options.hash.current) -3 : 1)

        if (i !== 1) { // if we are not on the 1 page
            outputHTML += `<li class="page-item disabled"><a class="page-link p-3 ">...</a></li>`
        }

        for (; i <= (Number(options.hash.current) + 3) && i <= options.hash.pages; i++) {

            if (i === options.hash.current) { //if we are on the current page, displaying there is

                outputHTML += `<li class="page-item active"><a class="page-link p-3 ">${i}</a></li>`
            }
            else {
                outputHTML += `<li class="page-item"><a class="page-link p-3 " href="?page=${i}">${i}</a></li>`
            }
            if (i == Number(options.hash.current) + 3 && i < options.hash.pages) {
                //show me three dots after 3 pages from the existing page
                outputHTML += `<li class="page-item disabled"><a class="page-link p-3 ">...</a></li>`

            }

        }


        if (options.hash.current == options.hash.pages) {

            outputHTML += `<li class="page-item disabled"><a class="page-link p-3 " >Last</a></li>`
        } else {
            outputHTML += `<li class="page-item"><a class="page-link p-3 " href="?page=${options.hash.pages}">Last</a></li>`
        }


        return outputHTML
    }
}