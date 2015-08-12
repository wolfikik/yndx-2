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

(function() {
    var requests = ['/countries', '/cities', '/populations'];
    var responses = {};
    var text = window.prompt('Please, enter the name of the city or country'),
        l= 0;

    for (i = 0; i < requests.length; i++) {
        var request = requests[i];

        var callback = (function (request) {
            return function(error, result){
                responses[request] = result;
                l++;

                if (l == requests.length) {
                    var c = [], cc = [], p = 0, arCities = [], sum = 0;
                    for (i = 0; i < responses['/countries'].length; i++) {
                        if (responses['/countries'][i].continent === 'Africa') {
                            c.push(responses['/countries'][i].name);
                        }
                    }

                    for (i = 0; i < responses['/cities'].length; i++) {
                        for (j = 0; j < c.length; j++) {
                            if (responses['/cities'][i].country === c[j]) {
                                cc.push(responses['/cities'][i].name);
                            }
                        }
                        if(responses['/cities'][i].country === text || responses['/cities'][i].name === text ){
                            arCities.push(responses['/cities'][i].name);
                        }
                    }

                    for (i = 0; i < responses['/populations'].length; i++) {
                        for (j = 0; j < cc.length; j++) {
                            if (responses['/populations'][i].name === cc[j]) {
                                p += responses['/populations'][i].count;
                            }
                        }

                        for (k = 0; k < arCities.length; k++) {
                            if (responses['/populations'][i].name === arCities[k]) {
                                sum += responses['/populations'][i].count;
                            }
                        }
                    }

                    if(sum > 0)
                        console.log('Total population in '+ text +': ' + sum);
                    else
                        console.log('Error, population data not found.');

                    console.log('Total population in African cities: ' + p);
                }
            }

        })(request);

        getData(request, callback);
    }
})();

