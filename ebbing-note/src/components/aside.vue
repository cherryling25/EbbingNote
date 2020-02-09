<template>
  <div id="aside">
    
    <router-link to='/home/main'>
        <div class="grid-content">
          <div class="title">
              {{title}}
            </div>
            <div class="content">
              {{content}}
            </div>
            <div class="time">
              {{time}}
            </div>
        </div>
    </router-link>

      <div class="main">
        <router-view></router-view>
      </div>
 
  </div>
</template>
<script>
export default {
  data() {
    return {
        title: '表单双向绑定',
        content: '1.  事件修饰符（见例子）在事件处理程序中调用',
        time: '2020-01-09  17:54'
    //   object: {
    //     title: '菜鸟教程',
    //     content: 'http://www.runoob.com',
    //     time: '学的不仅是技术，更是梦想！'
    // }
    };
  }
}; 
</script>

<style>
  .main{
    
  }
  a{
    text-decoration: none;
  }
  .grid-content {
    min-height: 116px;
    border-bottom: 1px solid rgb(185, 184, 184);
  }
  .title{
    font-size: 16px;
    margin-left: 20px;
  }
  .content{
    margin-left: 10px;
    font-size: 14px;
    color: rgb(97, 94, 94);
  }
  .time{
    margin-left: 10px;
    font-size: 14px;
    margin-top: 25px;
    color: rgb(97, 94, 94);
  }
</style>