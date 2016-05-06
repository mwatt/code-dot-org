class AddNcesIdAndEmailDomainToDistricts < ActiveRecord::Migration
  def change
    # National Center for Education Statistics (NCES) external Id
    add_column :districts, :nces_id, :integer, index: true
    add_column :districts, :email_domain, :string
  end
end
