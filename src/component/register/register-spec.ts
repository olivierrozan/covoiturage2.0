describe('register', () => {

    beforeEach(angular.mock.module('main'));

    var $componentController: ng.IComponentControllerService;
    var ctrl;

    beforeEach(inject((_$componentController_: ng.IComponentControllerService, $controller) => {
        $componentController = _$componentController_;

        ctrl = $componentController('register', null, null);
    }));

    it('should check ctrl call', () => {

        var c = ctrl;
        expect(c.isActive(2, 7)).toBeTruthy();
    });

    xit('should match password regex', () => {

        // Between 8 and 16 characters, letters and digits required
        let list = ['olivier59121', 'oLIvier59121', 'azerty123456fg78', 'azerty12'];

        list.map(el => {
            expect(el).toMatch(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/);
        });
    });

    xit('shouldn\'t match password regex', () => {

        let list = ['cv12', 'aaaaaaaaaa', '1234567890', 'oliv*/-<59', '123', 'sdf', '1234567mlk5678912', 'azertyd123jkvbn987'];

        list.map(el => {
            expect(el).not.toMatch(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/);
        });
    });
});