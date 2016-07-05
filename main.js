var Course, Grade, x;

Course = (function() {
  function Course(name, grades, total1, gpa) {
    this.name = name;
    this.grades = grades != null ? grades : [];
    this.total = total1;
    this.gpa = gpa;
  }

  Course.prototype.addGrade = function(grade) {
    return this.grades.push(grade);
  };

  return Course;

})();

Grade = (function() {
  function Grade(name, weight, value) {
    this.name = name;
    this.weight = weight != null ? weight : 100;
    this.value = value != null ? value : 0;
  }

  return Grade;

})();

new Vue({
  el: '#app',
  data: {
    items: [
      {
        weight: '',
        grade: '',
        placeholder: 'Test or Assignment',
        name: ''
      }, {
        weight: '',
        grade: '',
        placeholder: 'Test or Assignment',
        name: ''
      }, {
        weight: '',
        grade: '',
        placeholder: 'Test or Assignment',
        name: ''
      }, {
        weight: '',
        grade: '',
        placeholder: 'Test or Assignment',
        name: ''
      }, {
        weight: '',
        grade: '',
        placeholder: 'Test or Assignment',
        name: ''
      }
    ],
    breakdown: (function() {
      var j, results;
      results = [];
      for (x = j = 100; j >= 0; x = j += -10) {
        results.push(x);
      }
      return results;
    })(),
    total: '100%',
    remainingWeight: 0,
    assumedInput: "100%",
    assumedGrade: '100%',
    course: new Course('Course 1')
  },
  methods: {
    calcGrade: function() {
      var _grade, _total, _weight, i, j, len, percentage, ref, total;
      total = 0;
      percentage = 0;
      ref = this.items;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        _weight = parseFloat(i.weight);
        _grade = parseFloat(i.grade);
        if (!i.weight && !i.grade) {
          continue;
        }
        _weight = _weight > 1 ? _weight / 100 : _weight;
        percentage += _weight;
        _grade = _grade > 100 ? 100 : _grade;
        _total = _weight * _grade;
        total += _total;
      }
      this.total = total.toFixed(2);
      this.remainingWeight = percentage > 1 ? 0 : 100 - (percentage * 100);
      this.remainingWeight = parseFloat(this.remainingWeight);
      this.remainingWeight = this.remainingWeight ? this.remainingWeight.toFixed(2) : 0;
      return this.calcAssumed();
    },
    calcAssumed: function() {
      var _in, _weight;
      _weight = parseFloat(this.remainingWeight / 100);
      _in = parseFloat(this.assumedInput);
      return this.assumedGrade = parseFloat(this.total) + (_weight * _in);
    },
    calcBreakdown: function(val) {
      var _in, _weight;
      _weight = parseFloat(this.remainingWeight / 100);
      _in = parseFloat(val);
      return parseFloat(this.total) + (_weight * _in);
    },
    addComponent: function() {
      this.items.push({
        'weight': '',
        'grade': '',
        'placeholder': 'Test or Assignment',
        'name': ''
      });
      $('.tooltipped').tooltip('remove');
      return this.$nextTick(function() {
        return $('.tooltipped').tooltip({
          'delay': 100
        });
      });
    },
    removeComponent: function(it) {
      return this.items.$remove(it);
    }
  },
  created: function() {
    return console.log(this.course);
  }
});

Vue.filter('gpaScale', function(grade) {
  var _gpa;
  _gpa = (function() {
    switch (false) {
      case !(grade < 50):
        return 'F';
      case !(grade <= 52):
        return 'D -';
      case !(grade <= 56):
        return 'D';
      case !(grade <= 59):
        return 'D +';
      case !(grade <= 62):
        return 'C -';
      case !(grade <= 66):
        return 'C';
      case !(grade <= 69):
        return 'C +';
      case !(grade <= 72):
        return 'B -';
      case !(grade <= 76):
        return 'B';
      case !(grade <= 79):
        return 'B +';
      case !(grade <= 84):
        return 'A -';
      case !(grade < 89):
        return 'A';
      default:
        return 'A+';
    }
  })();
  _gpa = (function() {
    switch (false) {
      case !(grade < 50):
        return "<strong class='red-text'>" + _gpa + "</strong>";
      case !(grade < 60):
        return "<strong class='orange-text'>" + _gpa + "</strong>";
      case !(grade < 70):
        return "<strong class='yellow-text'>" + _gpa + "</strong>";
      case !(grade < 80):
        return "<strong class='lime-text'>" + _gpa + "</strong>";
      case !(grade < 90):
        return "<strong class='green-text'>" + _gpa + "</strong>";
      case !(grade <= 100):
        return "<strong class='light-green-text'>" + _gpa + "</strong>";
    }
  })();
  if (grade && _gpa) {
    return grade + " " + _gpa;
  } else {
    return "0";
  }
});

