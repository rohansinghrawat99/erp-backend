export interface EmployeeCreateDto {
  emp_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  profile_pic_url?: string;
  code: string;
}