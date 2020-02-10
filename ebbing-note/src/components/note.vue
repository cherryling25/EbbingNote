<template>
<div id="note">
       {{id}}
</div>
</template>

<script>
export default {
  name: 'note',
  data() {
    return {
      id : this.$route.params.id
    };
  },
  created:function () {
    console.log('created');
    this.id = this.$route.params.id
  },
    
}
</script>

<style scoped>
.formtable{
  width: 1175px;

}
.el-col .el-input {
  margin-top: 29px;
}

.contains{
  margin-top: 20px;
  margin-left: 33px;
}

#product-label-card{
  width: 600px;
  height: 480px;
  box-shadow: 1px 1px 4px darkgrey;
  border-bottom: 2px solid #eee;
  margin-left: 250px;
  margin-top: 80px;
}

.product-label-price {
    padding-left: 15px;
    padding-top: 5px;
    height: 50px;
    font-size: 40px;
}

.product-label-div {
    font-size: 20px;
    padding-left: 15px;
    padding-top: 10px;
    height: 40px;
    width: 100%;
    
}

.col-lg-6 {
  max-width: 50%;
  padding-left: 10px;
}
label {
    display: inline-block;
    margin-top: 1.5rem;
    margin-bottom: 5px;
}

.twobutton{
  margin-left: 445px;
  margin-top: 20px;
}

.block{
  margin-left: 650px;
  margin-top: 20px;
}
</style>
