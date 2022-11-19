class ApiController {
    static urlAddress = 'http://localhost:3000/';

    static staticMethod() {
        return 'static method has been called.';
    }
    static {
        console.log('Class static initialization block called');
    }
}
