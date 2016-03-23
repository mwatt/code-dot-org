Sequel.migration do
  up do
    drop_table?(:cdo_mailing_lists)
  end
end
