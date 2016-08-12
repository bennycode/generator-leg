describe('Person', function() {

  beforeAll(function(done) {
    SystemJS.config({
      baseURL: '/base/src/main/js'
    });

    SystemJS.import('Person.js').then(function(Person) {
      window.Person = Person;
      done();
    });
  });

  describe('greet', function() {
    it('sends a greeting', function() {
      var benny = new Person('Benny');
      var greeting = benny.greet();
      expect(greeting).toBe('Hello, my name is Benny.');
    });
  });
});
