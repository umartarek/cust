from setuptools import setup, find_packages

setup(
    name='cust',
    version='0.0.1',
    description='Custom App for Frappe',
    author='umar',
    author_email='',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=['frappe'],
)
