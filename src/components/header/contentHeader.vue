<template>
  <div>
    <div class="title">
      <div class="title_content" style="max-width: 850px">
        <div class="remind remind_custom">
          <h3 class="subTitleColor sub">
            <span class="el-icon-menu"></span>
            <div class="title_custom">
              <span :class="name.length === 0 ? 'el-icon-loading' : '' ">
                {{name}}
                <!--<span class="notes_custom">{{notes}}</span>-->
              </span>
            </div>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" scoped>
export default {
  props: [
    'name',
    // 'notes'
  ]
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
.title {
  background-color: #252c33; // background-image: linear-gradient(-180deg, #ffffff 0%, #f8f8f9 100%);
  padding-right: 168px;
}

.remind {
  position: relative;
  padding: 8px 22px 6px 12px;
  h3 {
    font-size: 14px;
  }
}

.subTitleColor {
  color: $white;
}

.remind_custom {
  .sub {
    height: 22px;
    line-height: 22px;
    position: relative;
  }
  .icon_custom {
    position: absolute;
    left: 0;
    top: 0;
  }
  .title_custom {
    position: absolute;
    left: 20px;
    top: 0;
    .notes_custom {
      font-size: 12px;
      color: #9a9a9a;
    }
  }
}
</style>
