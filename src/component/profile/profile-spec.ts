describe('profile', () => {

    beforeEach(angular.mock.module('main'));

    var $componentController: ng.IComponentControllerService;
    var ctrl;
    var httpBackend;
    var scope;

    beforeEach(inject((_$componentController_: ng.IComponentControllerService, $controller, $httpBackend, $rootScope) => {
        httpBackend = $httpBackend;
        $componentController = _$componentController_;
        scope = $rootScope.$new();

        ctrl = $componentController('profile', null, null);
    }));

    afterEach(() => {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should ...', () => {

        let user = {
            email: 'rozan.oler@gmail.com'
        };

        httpBackend.expect('GET', 'http://localhost:9300/profile')
            .respond({
                'email': 'rozan.oler@gmail.com'
            });

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        scope.$apply( () => {
            ctrl.displayProfile();
        });

        httpBackend.flush();

        expect(user.email).toBe('rozan.oler@gmail.com');

    });
});