/**
 * Created by gbelmm on 13-01-15.
 */
angular.module('ngTemplateTable')
    .filter('capitalize', function () {
    return function (input, format) {
        if (!input) {
            return input;
        }
        format = format || 'all';
        if (format === 'first') {

            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        } else {
            var words = input.split(' ');
            var result = [];
            words.forEach(function (word) {
                if (word.length === 2 && format === 'team') {

                    result.push(word.toUpperCase());
                } else {
                    result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                }
            });
            return result.join(' ');
        }
    };
    ;
})