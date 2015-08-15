/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */

var CSity = {
    requests : ['/countries', '/cities', '/populations'],
    responses: {},
    text : '',
    data : {}
};

CSity.getText = function(){
    var count = 0;
    this.text = document.getElementById('data').value;
    for(var prop in this.data) {
        if(this.data[prop].country.toLowerCase() == this.text.toLowerCase()  || this.data[prop].sity.toLowerCase() == this.text.toLowerCase() )
            count += this.data[prop].count;
    }
    if(count > 0)
        document.getElementById('result').innerHTML = count;
    else
        document.getElementById('result').innerHTML = 'нет данных';

    document.getElementById('result-block').style.display = 'block';
}

CSity.getQuery = function(){
    var k = 0;
    this.requests.forEach(function(request){

        getData(request, function(error, result){
            for(var prop in result) {
                if (!result.hasOwnProperty(prop)) continue;
                if (result[prop].hasOwnProperty('continent')){
                    CSity.data[prop] = {
                        continent: result[prop].continent,
                        country: result[prop].name
                    };
                }

                if (result[prop].hasOwnProperty('country')){
                    for(var propCountry in CSity.data) {
                        if (CSity.data[propCountry].country == result[prop].country){
                            CSity.data[propCountry].sity = result[prop].name;
                        }
                    }
                }

                if (result[prop].hasOwnProperty('count')){
                    for(var propCount in CSity.data) {
                        if (CSity.data[propCount].sity == result[prop].name){
                            CSity.data[propCount].count = result[prop].count;
                        }
                    }
                }
            }

            if(++k == 3) CSity.infoAfrica(CSity.data);
        });
    });
};

CSity.infoAfrica = function(data){
    var sum = 0;
    for(var propData in data) {
        if (data[propData].hasOwnProperty('continent') && data[propData].continent == 'Africa'){
            sum += data[propData].count;
        }
    }
    document.getElementById('africa').innerHTML = sum;
};

CSity.getQuery();