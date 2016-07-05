class Course
  constructor: (@name, @grades = [], @total, @gpa) ->

  addGrade: (grade) ->
    @grades.push grade


class Grade
  constructor: (@name, @weight = 100, @value = 0) ->

new Vue({
  el: '#app'
  data: {
    items: [
      {weight: '', grade: '', placeholder: 'Test or Assignment', name: ''}
      {weight: '', grade: '', placeholder: 'Test or Assignment', name: ''}
      {weight: '', grade: '', placeholder: 'Test or Assignment', name: ''}
      {weight: '', grade: '', placeholder: 'Test or Assignment', name: ''}
      {weight: '', grade: '', placeholder: 'Test or Assignment', name: ''}
    ]
    breakdown: (x for x in [100..0] by -10)
    total: '100%'
    remainingWeight: 0
    assumedInput: "100%"
    assumedGrade: '100%'
    course: new Course('Course 1')
  }
  methods: {
    calcGrade: ->
      total = 0
      percentage = 0
      for i in this.items
        _weight = parseFloat(i.weight)
        _grade = parseFloat(i.grade)
        if !i.weight && !i.grade
          continue
        _weight = if _weight > 1 then _weight / 100 else _weight
        percentage += _weight
        _grade = if _grade > 100 then 100 else _grade
        _total = _weight * _grade
        total += _total
      this.total = total.toFixed(2)
      this.remainingWeight = if percentage > 1 then 0 else 100 - (percentage * 100)
      this.remainingWeight = parseFloat(this.remainingWeight)
      this.remainingWeight = if this.remainingWeight then this.remainingWeight.toFixed(2) else 0
      this.calcAssumed()
    
    calcAssumed: ->
      _weight = parseFloat(this.remainingWeight / 100)
      _in = parseFloat(this.assumedInput)
      this.assumedGrade = parseFloat(this.total) + (_weight * _in)

    calcBreakdown: (val) ->
      _weight = parseFloat(this.remainingWeight / 100)
      _in = parseFloat(val)
      return parseFloat(this.total) + (_weight * _in)

    addComponent: ->
      this.items.push({'weight':'','grade':'', 'placeholder': 'Test or Assignment', 'name': ''})
      $('.tooltipped').tooltip('remove')
      this.$nextTick ->
        $('.tooltipped').tooltip({'delay': 100})

    removeComponent: (it) ->
      this.items.$remove(it)
  },
  created: ->
    # console.log this.breakdown
    console.log this.course
})

Vue.filter 'gpaScale', (grade) ->

  _gpa = switch
    when grade < 50 then 'F'
    when grade <= 52 then 'D -'
    when grade <= 56 then 'D'
    when grade <= 59 then 'D +'
    when grade <= 62 then 'C -'
    when grade <= 66 then 'C'
    when grade <= 69 then 'C +'
    when grade <= 72 then 'B -'
    when grade <= 76 then 'B'
    when grade <= 79 then 'B +'
    when grade <= 84 then 'A -'
    when grade < 89 then 'A'
    else 'A+' 

  _gpa = switch
    when grade < 50 then "<strong class='red-text'>#{_gpa}</strong>"
    when grade < 60 then "<strong class='orange-text'>#{_gpa}</strong>"
    when grade < 70 then "<strong class='yellow-text'>#{_gpa}</strong>"
    when grade < 80 then "<strong class='lime-text'>#{_gpa}</strong>"
    when grade < 90 then "<strong class='green-text'>#{_gpa}</strong>"
    when grade <= 100 then "<strong class='light-green-text'>#{_gpa}</strong>"

  # console.log grade, _gpa
  if grade and _gpa
    return "#{grade} #{_gpa}"
  else
    return "0"



