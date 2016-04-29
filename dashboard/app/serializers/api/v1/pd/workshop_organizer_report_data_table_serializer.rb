class Api::V1::Pd::WorkshopOrganizerReportDataTableSerializer < ::ActiveModel::Serializer
  include ::Api::V1::DataTableSerializerHelper

  attributes :cols, :rows

  def cols
    names = [
      'Workshop Organizer',
      'Workshop Organizer Id',
      'Workshop Organizer Email',
      'Workshop Dates',
      'Workshop Type',
      'Section Url',
      'Facilitators',
      'Workshop Name',
      'Course',
      'Subject',
      {label: 'Num Teachers', type: 'number'},
      {label: 'Days', type: 'number'}
    ]
    if scope.admin?
      names += [
        'Payment Type',
        {label: 'Qualified', type: 'boolean'},
        {label: 'Payment Amount', type: 'number'}
      ]
    end

    data_table_columns names
  end

  def rows
    object.map do |row|
      keys = [
        :organizer_name,
        :organizer_id,
        :organizer_email,
        :workshop_dates,
        :workshop_type,
        {v: row[:section_url], f: "<a href=#{row[:section_url]}>#{row[:section_url]}</a>"},
        :facilitators,
        :workshop_name,
        :course,
        :subject,
        :num_teachers,
        :days
      ]
      if scope.admin?
        keys += [
          {v: row[:payment_type]},
          {v: row[:qualified], f: row[:qualified] ? 'TRUE' : 'FALSE'},
          {v: row[:payment_amount], f: "$#{sprintf('%0.2f', (row[:payment_amount]))}"}
        ]
      end

      data_table_row row, keys
    end
  end
end
