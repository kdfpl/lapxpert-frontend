<template>
  <div class="customer-list-container" style="width: 100%; height: 100%;">
    <div class="customer-list"></div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Mã, tên, sđt, email..." class="search-input">
      <button class="search-btn" @click="searchCustomers">Tìm kiếm</button>
    </div>

    <div class="filters">
      <label>Trạng thái</label>
      <label>
        <input type="radio" value="all" v-model="filterStatus"> Tất cá
      </label>
      <label>
        <input type="radio" value="active" v-model="filterStatus"> Hoạt động
      </label>
      <label>
        <input type="radio" value="inactive" v-model="filterStatus"> Không hoạt động
      </label>
    </div>

    <div class="actions">
      <div class="file-upload">
        <input type="file" @change="handleFileUpload" class="file-input">
      </div>
      <button class="import-btn" @click="importExcel">Nhập Excel</button>
      <button class="add-btn" @click="addCustomer">Thêm khách hàng</button>
    </div>

    <table class="customer-table">
      <thead>
      <tr>
        <th>STT</th>
        <th>Mã</th>
        <th>Họ tên</th>
        <th>Số điện thoại</th>
        <th>Địa chỉ</th>
        <th>Trạng thái</th>
        <th>Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(customer, index) in paginatedCustomers" :key="customer.id">
        <td>{{ index + 1 }}</td>
        <td>{{ customer.code }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.phone }}</td>
        <td>{{ customer.email }}</td>
        <td>{{ customer.address }}</td>
        <td>
            <span class="status" :class="customer.status === 'active' ? 'status-active' : 'status-inactive'">
              {{ customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
            </span>
        </td>
        <td>
          <button class="edit-btn" @click="editCustomer(customer)">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="edit-btn" @click="deleteCustomer(customer)">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="edit-btn" @click="detailsCustomer(customer)">
            <i class="fa-solid fa-circle-info"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">‹</button>

    <button v-for="page in totalPages" :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }">
      {{ page }}
    </button>

    <button @click="nextPage" :disabled="currentPage === totalPages">›</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      filterStatus: "active",
      customers: [
        { id: 1, code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789",email:"hmailinh9@gmail.com", address: "3 P. Trịnh Văn Bô, Hà Nội", status: "active" },
        { id: 2, code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789", email:"hmailinh9@gmail.com",address: "3 P. Trịnh Văn Bô, Hà Nội", status: "inactive" },
        { id: 3, code: "KH003", name: "Hoàng Minh C", phone: "0777888999", email:"hmailinh9@gmail.com", address: "Đà Nẵng", status: "active" },
        { id: 4, code: "KH004", name: "Phạm Văn D", phone: "0345678901", email:"hmailinh9@gmail.com", address: "Cần Thơ", status: "inactive" },
        { id: 5, code: "KH005", name: "Lê Thanh E", phone: "0456789012", email:"hmailinh9@gmail.com", address: "Hải Phòng", status: "active" },
        { id: 6, code: "KH006", name: "Đặng Thu F", phone: "0567890123", email:"hmailinh9@gmail.com", address: "Huế", status: "inactive" },
        { id: 7, code: "KH007", name: "Bùi Công G", phone: "0678901234", email:"hmailinh9@gmail.com", address: "Nha Trang", status: "active" },
        { id: 8, code: "KH008", name: "Ngô Thị H", phone: "0789012345", email:"hmailinh9@gmail.com", address: "Quảng Ninh", status: "inactive" },
        { id: 9, code: "KH009", name: "Hoàng Minh I", phone: "0890123456", email:"hmailinh9@gmail.com", address: "Vinh", status: "active" },
        { id: 10, code: "KH010", name: "Phan Văn J", phone: "0901234567", email:"hmailinh9@gmail.com", address: "Bình Dương", status: "inactive" }
      ],
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter(customer =>
          (this.searchQuery === "" || customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (this.filterStatus === "all" || customer.status === this.filterStatus)
      );
    },
    paginatedCustomers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredCustomers.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredCustomers.length / this.itemsPerPage) || 1;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    searchCustomers() {
      console.log("Tìm kiếm:", this.searchQuery);
    },
    handleFileUpload(event) {
      console.log("File uploaded:", event.target.files[0]);
    },
    importExcel() {
      console.log("Nhập Excel");
    },
    addCustomer() {
      console.log("Thêm khách hàng");
    },
    editCustomer(customer) {
      console.log("Chỉnh sửa:", customer);
    },
    deleteCustomer(customer) {
      console.log("Xóa:", customer);
    },
    detailsCustomer(customer) {
      console.log("Xem chi tiết:", customer);
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.pagination button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.customer-list-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}
.search-bar {
  padding-left: 200px;
  padding-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  width: 300px;
}
.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.search-btn {
  background: black;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
}
.filters {
  padding-left: 200px;
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
.actions {
  padding-right: 100px;
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  float: right;
}
.file-upload {
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  width: fit-content;
}
.customer-table {
  width: 100%;
  border-collapse: collapse;
}
.customer-table th, .customer-table td {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.add-btn{
  background: #557ef8;
  color: white;
  border: 0;
  border-radius: 10px;
}
.import-btn{
  background: #839eb6;
  color: white;
  border: 0;
  border-radius: 10px;
}
.status {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid;
  display: inline-block;
}
.status-active {
  color: green;
  border-color: green;
  font-weight: bold;
}
.status-inactive {
  color: red;
  border-color: red;
  font-weight: bold;
}
.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid black;
  cursor: pointer;
  color: black;
  background: white;
}
.pagination .active {
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}
.customer-list {
  width: 100%;
  height: 230px;
  background-image: url('https://res.cloudinary.com/dieecfslw/image/upload/v1741458467/e8c999770d2a02ffab41f0e1e6c9de15_pnvbye.jpg');
  background-size: cover;
  background-position: center -150px;
  background-repeat: no-repeat;
  padding-bottom: 20px;
}

</style>