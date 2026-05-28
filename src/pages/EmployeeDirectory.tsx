import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useEmployees } from '../hooks/useEmployees';
import { EmployeeHeader } from '../components/EmployeeHeader';
import { EmployeeFilters } from '../components/EmployeeFilters';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeePagination } from '../components/EmployeePagination';
import { EmployeeModal } from '../components/EmployeeModal';

export interface Employee {
    id: string;
    fullName: string;
    email: string;
    jobTitle: string;
    department: string;
    country: string;
    salary: number;
    hireDate: string;
}


const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Product', 'Design'];
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Germany', 'India', 'Singapore', 'Australia', 'France', 'Japan', 'Brazil'];

const ITEMS_PER_PAGE = 10;

export const EmployeeDirectory: React.FC = () => {
    // Data States
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('name') || '';
    const selectedDept = searchParams.get('department') || '';
    const selectedCountry = searchParams.get('country') || '';
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { isFetching, employees, total, error } = useEmployees({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        name: searchTerm,
        department: selectedDept,
    });

    const updateParams = (newParams: Record<string, string>) => {
        setSearchParams((searchParams) => {
            Object.entries(newParams).forEach(([key, value]) => {
                if (value) {
                    searchParams.set(key, value);
                } else {
                    searchParams.delete(key);
                }
            })
            return searchParams;
        })
    };

    // Modal form states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);

    // Form Field States
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        jobTitle: '',
        department: 'Engineering',
        country: 'United States',
        salary: '',
        hireDate: new Date().toISOString().split('T')[0]
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Form Reset
    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            jobTitle: '',
            department: 'Engineering',
            country: 'United States',
            salary: '',
            hireDate: new Date().toISOString().split('T')[0]
        });
        setFormErrors({});
        setEditingEmployeeId(null);
    };

    // Open Add Modal
    const handleOpenAddModal = () => {
        resetForm();
        setModalMode('add');
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleOpenEditModal = (employee: Employee) => {
        setFormData({
            fullName: employee.fullName,
            email: employee.email,
            jobTitle: employee.jobTitle,
            department: employee.department,
            country: employee.country,
            salary: employee.salary.toString(),
            hireDate: employee.hireDate
        });
        setFormErrors({});
        setEditingEmployeeId(employee.id);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    // Handle Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error on change
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    // Form Validation
    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.jobTitle.trim()) errors.jobTitle = 'Job Title is required';
        if (!formData.salary.trim() || isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
            errors.salary = 'Salary must be a positive number';
        }
        if (!formData.hireDate) errors.hireDate = 'Hire Date is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Save Employee
    const handleSaveEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const salaryNum = Number(formData.salary);

        if (modalMode === 'add') {
            const newEmployee: Employee = {
                id: Date.now().toString(),
                fullName: formData.fullName,
                email: formData.email,
                jobTitle: formData.jobTitle,
                department: formData.department,
                country: formData.country,
                salary: salaryNum,
                hireDate: formData.hireDate
            };
        } else if (modalMode === 'edit' && editingEmployeeId) {

        }

        setIsModalOpen(false);
        resetForm();
    };

    // Delete Employee
    const handleDeleteEmployee = (id: string) => {
        if (confirm('Are you sure you want to delete this employee?')) {

        }
    };

    // Pagination Logic — server returns one page at a time, use `total` for page count
    const totalItems = total;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    const indexOfFirstItem = (currentPage - 1) * ITEMS_PER_PAGE;
    const indexOfLastItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            updateParams({ page: page.toString() });
        }
    };



    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Composited Header */}
            <EmployeeHeader onAddClick={handleOpenAddModal} />

            {/* Composited Filters */}
            <EmployeeFilters
                setSearchTerm={(term) => {
                    setSearchParams({
                        name: term,
                        department: selectedDept,
                        country: selectedCountry,
                        page: '1'
                    })
                }}
                selectedDept={selectedDept}
                setSelectedDept={(dept) => {
                    setSearchParams({
                        name: searchTerm,
                        department: dept,
                        country: selectedCountry,
                        page: '1'
                    })
                }}
                selectedCountry={selectedCountry}
                setSelectedCountry={(country) => {
                    setSearchParams({
                        name: searchTerm,
                        department: selectedDept,
                        country: country,
                        page: '1'
                    })
                }}
                departments={DEPARTMENTS}
                countries={COUNTRIES}
            />

            {/* Composited Table and Pagination wrapper */}
            {isFetching ? <div>Loading...</div> : <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
                <EmployeeTable
                    employees={employees as unknown as Employee[]}
                    onEditClick={handleOpenEditModal}
                    onDeleteClick={handleDeleteEmployee}
                />

                <EmployeePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem}
                    onPageChange={handlePageChange}
                />
            </div>}

            {/* Composited Form Modal */}
            <EmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                modalMode={modalMode}
                formData={formData}
                formErrors={formErrors}
                onInputChange={handleInputChange}
                onSubmit={handleSaveEmployee}
                departments={DEPARTMENTS}
                countries={COUNTRIES}
            />
        </div>
    );
};
