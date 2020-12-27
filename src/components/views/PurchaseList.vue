<template>
  <div class="list">
    <Row>
      <Col>
        <Card>
          <Form :label-width="80" inline>
            <Form-item label="采购类别">
              <Select v-model="formItem.purchaseType" style="width:200px" clearable >
                <Option v-for="item in purchaseTypeList" :value="item.attrValue" :key="item.attrValue">{{ item.attrName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="品名">
              <Select v-model="formItem.subPurchaseType" style="width:200px" clearable >
                <Option v-for="item in subPurchaseTypeList" :value="item.attrValue" :key="item.attrValue">{{ item.attrName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="下单日期">
              <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px" format="yyyy/MM/dd" @on-change="changeDate"></DatePicker>
            </Form-item>
            <Form-item label="下单店">
              <Select v-model="formItem.shopName" clearable style="width:200px">
                <Option v-for="item in shopNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <div class="clearfix" style="border-top:1px solid #eee;margin-top:-15px;padding-top:10px">
           <span class="pull-right">
              <!--<Button type="primary"  @click="deleteSelect"> <Icon type="ios-beaker-outline" /> 批量删除</Button>-->
             <Button type="success" @click.native="edit(-1)" >
               <Icon type="ios-add" />
             新增
             </Button>
            </span>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
    <!-- 搜索 /-->
    <Row>
      <Col>
        <Card>
          <!--<div slot="title">-->
            <!--<Icon type="ios-film-outline"></Icon>-->
            <!--干货集中营-->
            <!--<Button type="dashed" @click.native="fixedHeader=!fixedHeader">-->
              <!--<Icon type="pin"></Icon>-->
            <!--</Button>-->
            <!--<Button type="success" @click.native="edit(-1)">-->
              <!--<Icon type="trash-a"></Icon>-->
              <!--新增-->
            <!--</Button>-->
            <!--<Button type="primary" @click="searchShow" shape="circle" ><Icon type="funnel"></Icon> 筛选</Button>-->
            <!--<Button type="error" v-if="selection.length>0" @click="deleteTip=true">-->
              <!--<Icon type="trash-a"></Icon>-->
              <!--批量删除-->
            <!--</Button>-->
          <!--</div>-->
          <a href="#" slot="extra" @click.prevent="refresh">
            <Icon type="ios-loop-strong"></Icon>
          </a>
          <Table :loading="loading2" :size="tableSize"
                 :data="listData"  tooltip height="350" show-summary
                 :columns="columns1" ref="table"></Table>
          <Page :total="total" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px" :current="current" :page-size-opts="pageSizeOpt"
                @on-page-size-change="PageSizeChange"></Page>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <div slot="title">
            <Button type="primary" icon="ios-download-outline" shape="circle" @click="exportData(1)">导出所有</Button>
            <Button type="primary" icon="ios-download-outline" shape="circle"
                    @click="exportData(2)">导出过滤后数据</Button>
          </div>
        </Card>
      </Col>
    </Row>
    <!--删除提示  -->
    <Modal v-model="deleteTip" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此操作讲删除{{selection.length}}条数据,并不可恢复。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteBatch">删除</Button>
      </div>
    </Modal>
    <!--删除提示 / -->
    <!-- 编辑 -->
    <Modal v-model="editModal" v-if='DateReady'>
      <p slot="header" style="text-align:center">
        <Icon type="information-circled"></Icon>
        <span v-if="currIndex==-1">新增</span>
        <span v-if="currIndex!=-1">修改</span>
      </p>
      <div style="text-align:center">
        <Form :model="currDate" ref="currDate" :rules="ruleValidate" :label-width="80">
          <Row>
            <Col span="12">
              <Form-item label="下单日期" prop="purchaseTime">
                <Date-picker type="date" placeholder="选择日期" style="width:100%" :disabled="currIndex!=-1" @on-change="changeCurrDate"
                             :editable='false'></Date-picker>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="类别" prop="parentType">
                <Select v-model="currDate.parentType"  :disabled="currIndex!=-1" :clearable="currIndex!=-1">
                  <Option v-for="item in purchaseTypeList" :value="item.attrValue" :key="item.attrValue" :disabled="currIndex!=-1" >{{ item.attrName }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="品名" prop="purchaseType">
                <Select v-model="currDate.purchaseType"   :disabled="currIndex!=-1" :clearable="currIndex!=-1">
                  <Option v-for="item in currentSubPurchaseTypeList" :value="item.attrValue" :key="item.attrValue">{{ item.attrName }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="单价" prop="unitPrice">
                <Input v-model="currDate.unitPrice" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="数量" prop="purchaseNum">
                <Input v-model="currDate.purchaseNum" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="总价" prop="totalPrice">
                <Input v-model="currDate.totalPrice" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="24">
              <Form-item label="备注">
                <Input v-model="currDate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="请输入..."></Input>
              </Form-item>
            </Col>
          </Row>

        </Form>
      </div>
      <div slot="footer">
        <Button  @click.native="onCancel" >
          取消
        </Button>
        <Button type="success"   @click.native="saveBatch" :loading="loading" >
          保存
        </Button>
      </div>
    </Modal>
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除提醒</span>
      </p>
      <div style="text-align:center">
        <p>您确定要删除这条记录吗.</p>
        <!--<p>Will you delete it?</p>-->
      </div>
      <div slot="footer">
        <Button  @click="onCancel">取消</Button>
        <Button type="error"   :loading="modal_loading" @click="deleteCurrent">删除</Button>
      </div>
    </Modal>
    <!-- 编辑/ -->
  </div>
</template>
<script>
  import elementResizeDetectorMaker from 'element-resize-detector'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'list',
    components: {},
    data () {
      return {
        purchaseTypeList: [],
        subPurchaseTypeList: [],
        currentSubPurchaseTypeList: [],
        allInitList: [],
        total: 0,
        deleteModal: false,
        deleteIndex: '',
        shopNameList: [
          {
            value: '石路店',
            label: '石路店'
          },
          {
            value: '平江路店',
            label: '平江路店'
          }
        ],
        editItem: {
          purchaseType: '',
          subPurchaseType: '',
          shopName: ''
        },
        formItem: {
          purchaseType: '',
          subPurchaseType: '',
          shopName: '',
          purchaseDate: [],
          page: 1,
          pageSize: 10,
          checkbox: []
        },
        selectItem: [],
        searchState: false,
        editModal: false,
        detailModal: false,
        deleteTip: false,
        showHeader: true, // 是否显示表头 @:show-header
        loading2: false, // 分页loading
        tableSize: 'small', // @:size
        DateReady: false, // 判断异步数据加载完成，避免报错
        loading: false, // save
        modal_loading: false,
        currDate: {
          // purchaseTime: [],
          // parentName: '',
          // purchaseName: '',
          unitPrice: '',
          purchaseNum: '',
          totalPrice: ''
          // remark: ''
        }, // 当前编辑和新增的行数据
        currIndex: 0, // 当前编辑和新增的行号
        saveDisabled: false,
        current: 1,
        pageSizeOpt: [10, 30, 50, 70, 90, 110],
        params: {
          page: 1,
          pageSize: 10
        },
        selection: [], // 表格选中项
        listData: [], // @:data
        columns1: [
          {
            title: '下单店',
            width: 100,
            key: 'shopAddr'
          },
          {
            title: '下单日期',
            key: 'purchaseTime',
            width: 110,
            sortable: true
          },
          {
            title: '类别',
            width: 100,
            key: 'parentName'
          },
          {
            title: '品名',
            width: 100,
            key: 'purchaseName'
          },
          {
            title: '单价',
            width: 80,
            key: 'unitPrice'
          },
          {
            title: '数量',
            width: 80,
            key: 'purchaseNum'
          },
          {
            title: '规格',
            width: 80,
            key: 'purchaseSpec'
          },
          {
            title: '总价',
            width: 80,
            key: 'totalPrice'
          },
          {
            title: '下单员工',
            width: 100,
            key: 'staffName'
          },
          {
            title: '备注信息',
            width: 200,
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 170,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ff3300'
                  },
                  on: {
                    click: () => {
                      this.deleteModal = true
                      this.deleteIndex = params.index
                      // this.remove(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        ruleValidate: {
          unitPrice: [
            {required: true, message: '单价不能为空', trigger: 'change'}
          ],
          purchaseNum: [
            {required: true, message: '数量不能为空', trigger: 'change'}
          ],
          totalPrice: [
            {required: true, message: '总价不能为空', trigger: 'change'}
          ],
          purchaseType: [
            {required: true, message: '品名不能为空', trigger: 'change'}
          ],
          parentType: [
            {required: true, message: '类别不能为空', trigger: 'change'}
          ],
          purchaseTime: [
            {required: true, message: '下单日期不能为空', trigger: 'change'}
          ]
        }
      }
    },
    watch: {
      /**
       * @params 监听参数变化重新获取数据
       * */
      formItem: {
        handler (val) {
          this.getData(this.formItem.page)
        },
        deep: true
      },
      'currDate.unitPrice': function (val) {
        if (this.currDate.purchaseNum) {
          // 如果存在数量
          this.currDate.totalPrice = val * this.currDate.purchaseNum
          this.currDate.totalPrice = this.currDate.totalPrice.toString()
        }
      },
      'currDate.purchaseNum': function (val) {
        if (this.currDate.unitPrice) {
          // 如果存在数量
          this.currDate.totalPrice = val * this.currDate.unitPrice
          this.currDate.totalPrice = this.currDate.totalPrice.toString()
        }
      },
      'formItem.purchaseType': function (val) {
        this.formItem.subPurchaseType = ''
        this.subPurchaseTypeList = this.allInitList[val]
      },
      'currDate.parentType': function (val) {
        if (this.currIndex === -1) {
          this.currDate.purchaseType = ''
        }
        this.currentSubPurchaseTypeList = this.allInitList[val]
      }
    },
    computed: {
      state () {
        return this.$store.state.app
      }
    },
    methods: {
      searchShow () {
        this.searchState = !this.searchState
      },
      changeCurrDate(list){
        this.currDate.purchaseTime = list
      },
      changeDate (list) {
        this.formItem.purchaseDate = list
      },
      onCancel () {
        this.editModal = false
        this.deleteModal = false
      },
      deleteCurrent () {
        // 需要删除这一行；
        let deleteRequest = {
          purchaseListId: this.listData[this.deleteIndex].purchaseListId
        }
        this.$api.deletePurchaseRow(deleteRequest).then((res) => {
          this.loading2 = false
          this.deleteModal = false
          if (res.code === 200) {
            // 初始化下拉
            this.getData(this.formItem.page)
            this.$Message.success('删除成功')
          } else {
            this.$Message.error('删除失败')
          }
        })
      },
      init () {
        this.$api.initList({}).then((res) => {
          if (res.code === 200) {
            // 初始化下拉
            this.allInitList = res.data
            this.purchaseTypeList = res.data[2]
            this.loading2 = false
          } else {
            this.$Message.error(res.msg)
            this.loading2 = false
          }
        })
      },
      /**
       * 刷新页面请求
       * */
      refresh () {
        // this.getData()
      },
      /**
       * @params:category 分类 page：页码 limit:条数
       * */
      getData (currentPage) {
        this.loading2 = true
        this.listData = []
        this.DateReady = true
        this.loading2 = false
        this.formItem.page = currentPage
        this.current = currentPage
        this.$api.queryPurchaseList(this.formItem).then((res) => {
          if (res.code === 200) {
            this.listData = res.data.records
            this.total = res.data.total
            this.DateReady = true
            this.loading2 = false
          } else {
            this.$Message.error(res.msg)
            this.loading2 = false
          }
        })
      },
      /**
       * @on-change 页码改变的回调，返回改变后的页码
       * */
      pageChange (page) {
        debugger
        this.getData(page)
      },
      /**
       * @on-page-size-change 切换每页条数时的回调，返回切换后的每页条数
       * */
      PageSizeChange (limit) {
        debugger
        this.formItem.pageSize = limit
        this.getData(1)
      },
      /**
       * 表格对应操作方法
       * @show 查看
       * @remove 删除
       * @edit
       */
      show (index) {
        this.currIndex = index
        this.currDate = this.listData[index]
        this.detailModal = true
        this.$Modal.info({
          title: '详情',
          content: `姓名：${this.listData[index].who}<br>平台：${this.listData[index].type}<br>描述：${this.listData[index].desc}`
        })
      },
      remove (index) {
        this.listData.splice(index, 1)
      },
      // deleteSelect () {
      //  debugger
      //   this.selectItem ;
      // },
      edit (index) {
        this.editModal = true
        this.currIndex = index
        this.$refs['currDate'].resetFields()
        if (index === -1) { // 新增
          this.currDate = {
            unitPrice: '',
            purchaseNum: '',
            totalPrice: '',
            parentName: '',
            purchaseName: '',
            remark: '',
            purchaseTime: []
          }
        } else { // 编辑
          this.currDate = this.listData[index]
          debugger
          // 需要将其中的对象转为String
          this.currDate.unitPrice = this.currDate.unitPrice === 0 ? '' : this.currDate.unitPrice.toString()
          this.currDate.purchaseNum = this.currDate.purchaseNum === 0 ? '' : this.currDate.purchaseNum.toString()
          this.currDate.totalPrice = this.currDate.totalPrice === 0 ? '' : this.currDate.totalPrice.toString()
        }
      },
      /**
       * 批量删除
       */
      deleteBatch () {
        this.deleteTip = false
        // ...
      },
      saveBatch () {
        this.loading = true
        this.$refs['currDate'].validate((valid) => {
          if (valid) {
            let updateRequest = {
              purchaseListId: this.listData[this.currIndex].purchaseListId,
              unitPrice: this.currDate.unitPrice,
              purchaseNum: this.currDate.purchaseNum,
              totalPrice: this.currDate.totalPrice,
              remark: this.currDate.remark
            }
            this.$api.updatePurchaseRow(updateRequest).then((res) => {
              this.loading2 = false
              this.editModal = false
              if (res.code === 200) {
                // 初始化下拉
                this.loading = false
                this.getData(this.formItem.page)
                this.$Message.success('修改成功')
              } else {
                this.$Message.error('修改失败')
              }
            })
          } else {
            this.loading = false
          }
        })
      },
      /**
       * 数据导出
       * @ type 1 原始数据 2过滤数据
       */
      exportData (type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          })
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          })
        }
      },
      /**
       * 多选
       * selection：已选项数据 row：刚选择的项数据
       */
      onSelect (selection, row) {
        this.selectItem = selection
        debugger
      },
      onSelectCancel (selection) {
        this.selectItem = selection
        debugger
      }
    },
    created () {
      this.getData(this.formItem.page)
    },
    mounted () {
      erd.listenTo(window, 'resize', this.handleResize)
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .search-filter {
    opacity: 0;
    display: none;
    overflow: hidden;
    transition: all 0.28s ease-out;
    &.active {
      opacity: 1;
      display: block;
    }
  }
</style>

