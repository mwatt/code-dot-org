mary = User.find_or_create_teacher({
  name: 'Mary',
  email: 'mary@code.org',
  password: 'password',
  confirmed_at: Time.zone.now,
  admin: true
}, nil)

cody = User.find_or_create_teacher({
  name: 'Cody',
  email: 'cody@code.org',
  password: 'password',
  confirmed_at: Time.zone.now
}, nil)
cody_plp = Plp.find_or_create_by(
  contact_id: cody.id,
  name: 'Illinois Institute of Technology',
  urban: true
)
cody.permission=UserPermission::WORKSHOP_ORGANIZER

laura = User.find_or_create_teacher({
  name: 'Laura',
  email: 'laura@code.org',
  password: 'password',
  confirmed_at: Time.zone.now
}, nil)
laura_plp = Plp.find_or_create_by(
  contact_id: laura.id,
  name: 'Charles County Public Schools',
  urban: true
)
laura.permission=UserPermission::WORKSHOP_ORGANIZER


malorie = User.find_or_create_teacher({
  name: 'Malorie',
  email: 'malorie@code.org',
  password: 'password',
  confirmed_at: Time.zone.now
}, nil)
malorie.permission=UserPermission::DISTRICT_CONTACT
malorie_district = District.find_by_name('Los Angeles Unified School District')
malorie_district.contact_id = malorie.id
malorie_district.save!

