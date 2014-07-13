// Addign Google Analytics
angular.module('myApp', ['angulartics', 'angulartics.google.analytics']);

function qaController($scope) {
    'use strict';

    $scope.app = { name: "Qur'an Aid" };

    // set & store db version
    var dbVersion = localStorage.dbVersion;
    if (angular.isUndefined(dbVersion)) {
        localStorage.dbVersion = "1.0";
        dbVersion = localStorage.dbVersion;
    }

    // handle different db version (in case of schema changes after initial deployment so users dont' lose past data).
    // TODO: Add data migration if necessary here.

    // check if localstorage has data, if not load it.
    var defaultRecitationDb = JSON.stringify([
        {day: 1, surah: '1:1 - 2:141', pages: '1-16', hasReadQuran: false, hasMeditated: false},
        {day: 2, surah: '2:142 - 2:252', pages: '16-27', hasReadQuran: false, hasMeditated: false},
        {day: 3, surah: '2:253 - 3:91', pages: '27-41', hasReadQuran: false, hasMeditated: false},
        {day: 4, surah: '3:92 - 4:23', pages: '41-53', hasReadQuran: false, hasMeditated: false},
        {day: 5, surah: '4:24 - 4:147', pages: '53-64', hasReadQuran: false, hasMeditated: false},
        {day: 6, surah: '4:148 - 5:82', pages: '64-76', hasReadQuran: false, hasMeditated: false},
        {day: 7, surah: '5:83 - 6:110', pages: '76-88', hasReadQuran: false, hasMeditated: false},
        {day: 8, surah: '6:111 - 7:87', pages: '88-100', hasReadQuran: false, hasMeditated: false},
        {day: 9, surah: '7:88 - 8:40', pages: '100-112', hasReadQuran: false, hasMeditated: false},
        {day: 10, surah: '8:41 - 9:93', pages: '112-124', hasReadQuran: false, hasMeditated: false},
        {day: 11, surah: '9:94 - 11:5', pages: '124-136', hasReadQuran: false, hasMeditated: false},
        {day: 12, surah: '11:6 - 12:52', pages: '136-148', hasReadQuran: false, hasMeditated: false},
        {day: 13, surah: '12:53 - 14:52', pages: '148-161', hasReadQuran: false, hasMeditated: false},
        {day: 14, surah: '15:1 - 16:128', pages: '161-174', hasReadQuran: false, hasMeditated: false},
        {day: 15, surah: '17:1 - 18:74', pages: '174-188', hasReadQuran: false, hasMeditated: false},
        {day: 16, surah: '18:75 - 20:135', pages: '188-202', hasReadQuran: false, hasMeditated: false},
        {day: 17, surah: '21:1 - 22:78', pages: '202-214', hasReadQuran: false, hasMeditated: false},
        {day: 18, surah: '23:1 - 25:20', pages: '214-228', hasReadQuran: false, hasMeditated: false},
        {day: 19, surah: '25:21 - 27:55', pages: '228-242', hasReadQuran: false, hasMeditated: false},
        {day: 20, surah: '27:56 - 29:45', pages: '242-255', hasReadQuran: false, hasMeditated: false},
        {day: 21, surah: '29:46 - 33:30', pages: '255-268', hasReadQuran: false, hasMeditated: false},
        {day: 22, surah: '33:31 - 36:27', pages: '268-282', hasReadQuran: false, hasMeditated: false},
        {day: 23, surah: '36:28 - 39:32', pages: '282-297', hasReadQuran: false, hasMeditated: false},
        {day: 24, surah: '39:33 - 41:46', pages: '297-310', hasReadQuran: false, hasMeditated: false},
        {day: 25, surah: '41:47 - 45:32', pages: '310-326', hasReadQuran: false, hasMeditated: false},
        {day: 26, surah: '45:33 - 51:30', pages: '326-344', hasReadQuran: false, hasMeditated: false},
        {day: 27, surah: '51:31 - 57:29', pages: '344-361', hasReadQuran: false, hasMeditated: false},
        {day: 28, surah: '58:1 - 66:12', pages: '361-381', hasReadQuran: false, hasMeditated: false},
        {day: 29, surah: '67:1 - 77:50', pages: '381-404', hasReadQuran: false, hasMeditated: false},
        {day: 30, surah: '78:1 - 114.6', pages: '404-446', hasReadQuran: false, hasMeditated: false}
    ]);

    var lsRamadan = localStorage.ramadan;
    if (angular.isUndefined(lsRamadan)) {
        // store data in localStorage
        localStorage.ramadan = defaultRecitationDb;
    }

    // parse json data from localstorage and populate table
    lsRamadan = JSON.parse(localStorage.ramadan);
    $scope.ramadan = lsRamadan;

    // update local storage whenever Qur'an has been read, or meditation on verses performed
    $scope.updateLocalStorage = function () {
        //console.log('all data including updates.', $scope.ramadan);

        // actually update local storage
        localStorage.ramadan = JSON.stringify($scope.ramadan);
    };

    // start over recitation / meditation for another round.
    $scope.startOver = function () {
        localStorage.ramadan = defaultRecitationDb;
        $scope.ramadan = defaultRecitationDb;

        // not sure why scope is dynamically refreshing but I'll just put this here for now since it works.
        // TODO: fix this so no refresh is necessary. Perhaps just needs to be in the scope watch function.
        document.location.reload();
    };
}
