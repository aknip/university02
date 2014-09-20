

describe('controller tests', function () {

    var $famousProvider, $famous;
    var $compile, $scope;

    beforeEach(module('famousApp'));

    beforeEach(module(function(_$famousProvider_) {
        $famousProvider = _$famousProvider_;
    }));

    beforeEach(inject(function (_$famous_, _$compile_, _$rootScope_, $controller) {

        $famous = _$famous_;
        $compile = _$compile_;
        $scope = _$rootScope_; // _$rootScope_.$new();

        createAppViewController = function() {
            return $controller('appviewCtrl', {
                '$scope': $scope
            });
        };
    }));

    it('should return a hashmap of loaded famo.us modules', function() {
        expect(typeof $famous).toBe('object');
        expect(Object.keys($famous).length).toBeGreaterThan(0);
        var EventHandler = $famous['famous/core/EventHandler'];
        expect(typeof EventHandler).toBe('function');
    });


    it('should define some $scope properties', function () {

        // test: no controller specified before injection
        expect($scope.somearray).toBeUndefined();

        // use controller "appview"
        var controller = createAppViewController();

        // test scope values
        expect($scope.menuToggleStatus).toBe(true);
        expect($scope.appOptions.device).toBe('none');

        // test property .sideNavElements and its length
        expect(angular.isArray($scope.sideNavElements)).toBeTruthy();
        expect($scope.sideNavElements.length).toBe(6);

    });


    it('should define a function $scope.add', function () {

        // use controller "appview"
        var controller = createAppViewController();

        // test function .menuToggle
        expect(typeof $scope.menuToggle).toBe("function", ".menuToggle should be function");
        $scope.menuToggle();
        expect($scope.menuToggleStatus).toEqual(false, "after .menueToogle property .menuToggleStatus should be FALSE");

    });

});


describe('service tests', function () {

    beforeEach(module('famousApp'));

    it('can get an instance of appOptions', inject(function(appOptions) {
        expect(appOptions).toBeDefined();
        expect(appOptions.device).toEqual("none");
    }));

    it('can get an instance of menuData', inject(function(menuData) {
        expect(menuData).toBeDefined();
        expect(menuData.length).toBe(6);
    }));

});
