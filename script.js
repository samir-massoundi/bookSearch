// Lien de l'api
let requeteURL='https://www.googleapis.com/books/v1/volumes?q=';

//Vide les resultats de recher
function flush() {
            var art = document.getElementById('SearchResult');

            while(art.firstChild) {
                art.removeChild(art.firstChild);
            }
}

function populateSection(JSONObj) {

        let mySection = document.createElement('section');
        mySection.className= "card col-lg-12 shadow-sm";

        let myCardBody = document.createElement('div');
        myCardBody.className="card-body";

        let titre = document.createElement('p'); //
        titre.className="card-title";

        let auteurs = document.createElement('p');
        auteurs.className="card-text";

        let isbn = document.createElement('p');
        isbn.className="card-text";

        let myHR = document.createElement('hr');

        //ajouter le texte
        titre.textContent = 'Titre : ' + JSONObj[0].volumeInfo.title;

        let nomsAuteurs ="";

        for (let i = 0; i< JSONObj[0].volumeInfo.authors.length; i++) {
            nomsAuteurs += JSONObj[0].volumeInfo.authors[i];
            if (i != JSONObj[0].volumeInfo.authors.length-1) {
                nomsAuteurs += ', '; // tenter une ternaire ici
            }
        }
        auteurs.textContent = 'Auteurs : '+ nomsAuteurs;

        isbn.textContent = 'ISBN : '+ JSONObj[0].volumeInfo.industryIdentifiers[0].identifier;

        //inserer dans le document HTML le contenu du texte
        myCardBody.appendChild(titre);
        myCardBody.appendChild(auteurs);
        myCardBody.appendChild(isbn);

        mySection.appendChild(myCardBody);

        let myArticle = document.getElementById('SearchResult');
        myArticle.appendChild(mySection);
        myArticle.appendChild(myHR);
}

function messageNoResult() {
    let mySection = document.createElement('section');
    mySection.className= "card col-lg-12 shadow-sm";

    let myCardBody = document.createElement('div');
    myCardBody.className="card-body";

    let noResults = document.createElement('p'); //
    noResults.className="card-text";

    let myHR = document.createElement('hr');
    let myArticle = document.getElementById('SearchResult');

    noResults.textContent = 'Aucun Resultat';

    myCardBody.appendChild(noResults);
    mySection.appendChild(myCardBody);
    myArticle.appendChild(mySection);
    myArticle.appendChild(myHR);

}

/*
Fonction BookSearch
paramatres
sortie
*
*/
function Booksearch(){
    console.log('Recherche de ' + document.getElementById("bookTitle").value);
    //console.log(requeteURL+document.getElementById("bookTitle").value);

    let reqBook = new XMLHttpRequest();

    reqBook.open('GET', requeteURL+document.getElementById("bookTitle").value);
    reqBook.responseType='json';
    reqBook.send();



    reqBook.onload = function () {
        var resultBookSearch =reqBook.response;
        var firstResult = resultBookSearch['items'];
        console.log(resultBookSearch.totalItems);

        if(resultBookSearch.totalItems == 0)
        {
            messageNoResult();
        }
        else
        {
            console.log(firstResult[0].volumeInfo.title);
            console.log(firstResult[0].volumeInfo.industryIdentifiers[0].identifier);

            //console.log(firstResult.volumeInfo.authors[1]);
            for (let i =0; i < firstResult[0].volumeInfo.authors.length; i++)
            {
                console.log(firstResult[0].volumeInfo.authors[i]);
            }

            populateSection(firstResult);

            //let booksData = JSON.parse(resultBook);
            //console.log(JSON.parse(resultBook));
            //titre items.0.volumeInfo.title
            //auteurs items.0.volumeInfo.authors (plusieurs possible)
            //ISBN  items.0.volumeInfo.industryIdentifiers.0.type.identifier
        }


    }


}

function
