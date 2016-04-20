class Api::V1::Pd::WorkshopOrganizerReportDataTableSerializer < ActiveModel::Serializer
  # Serialize into google chart DataTable json.
  # See https://developers.google.com/chart/interactive/docs/reference
  attributes :cols, :rows

  def cols
    [
      column('Workshop Organizer'),
      column('Workshop Organizer Id'),
      column('Workshop Organizer Email'),
      column('Workshop Dates'),
      column('Workshop Type'),
      column('Section Url'),
      column('Facilitators'),
      column('Workshop Name'),
      column('Course'),
      column('Subject'),
      column('Num Teachers', 'number'),
      column('Days', 'number'),
      column('Payment Type'),
      column('Qualified', 'boolean'),
      column('Payment Amount', 'number')
    ]
  end

  def rows
    object.map do |row|
      {c: values(
        row,
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
        :days,
        :payment_type,
        {v: row[:qualified], f: row[:qualified] ? 'TRUE' : 'FALSE'},
        {v: row[:payment_amount], f: "$#{sprintf('%0.2f', (row[:payment_amount]))}"}
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
