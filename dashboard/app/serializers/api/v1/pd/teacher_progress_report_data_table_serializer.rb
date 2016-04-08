class Api::V1::Pd::TeacherProgressReportDataTableSerializer < ActiveModel::Serializer
  # Serialize into google chart DataTable json.
  # See https://developers.google.com/chart/interactive/docs/reference
  attributes :cols, :rows

  def cols
    [
      column('District Name'),
      column('District Id'),
      column('School'),
      column('Course'),
      column('Subject'),
      column('Workshop Dates'),
      column('Workshop Name'),
      column('Workshop Type'),
      column('Teacher Name'),
      column('Teacher Id'),
      column('Teacher Email'),
      column('Year'),
      column('Hours', 'number'),
      column('Days', 'number'),
    ]
  end

  def rows
    object.map do |row|
      {c: values(
        row,
        :district_name,
        :district_external_id,
        :school,
        :course,
        :subject,
        :workshop_dates,
        :workshop_name,
        :workshop_type,
        :teacher_name,
        :teacher_id,
        :teacher_email,
        :year,
        :hours,
        :days
      )}
    end
  end

  def values(row, *keys)
    keys.map do |key|
      case key
        when Hash
          key
        else
          {v: row[key]}
      end
    end
  end

  def column(label, type = 'string', pattern = nil)
    {label: label, type: type}.tap do |col|
      if pattern
        col[:pattern] = pattern
      end
    end
  end
end
