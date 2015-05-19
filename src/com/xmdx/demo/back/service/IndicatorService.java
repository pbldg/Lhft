package com.xmdx.demo.back.service;

import com.alibaba.fastjson.JSONObject;
import com.e9rj.platform.common.services.BusinessServices;
import com.xmzy.frameext.business.service.annotate.Service;
import com.xmzy.frameext.json.FastJsonUtil;
import com.xmzy.frameext.simpledb.DBDYDao;
import com.xmzy.frameext.simpledb.DBDYPO;
import com.xmzy.framework.context.ActionContext;
import org.apache.commons.lang.StringUtils;

import java.util.List;


@Service(name = "back.indicator")
public class IndicatorService extends BusinessServices {

    private final static String AUTH_FUNC_NO = "back.indicator";
    private final static String TABLE_NAME = "TB_INDICATOR";
    private final static String KEY_FIELD = "I_ID";

    @Override
    public int init(ActionContext actionContext) throws Exception {
        actionContext.setStringValue(CONST_FORMNAME, "com/xmdx/demo/face/indicator_main.html");
        return CONST_RESULT_SUCCESS;
    }

    @Override
    public int query(ActionContext actionContext) throws Exception {
        StringBuilder sql = new StringBuilder(String.format("SELECT * FROM %s I ", TABLE_NAME));
        String FIId = request.getParameter(KEY_FIELD);
        if (StringUtils.isNotBlank(FIId)) {
            sql.append(String.format(" WHERE IID=%s ", FIId)).append(super.order(actionContext, "I.ORDER", "ASC"));
            List<DBDYPO> pos = DBDYDao.selectBySQL2List(actionContext.getConnection(), sql.toString());
            String json = FastJsonUtil.dbdypoList2JsonString(pos);
            json.replaceAll("I_ID", "id");
            json.replaceAll("Name", "name");
            json.replaceAll("P_ID", "pid");
            JSONObject jsonObject = JSONObject.parseObject(json);
            actionContext.getHttpResponse().getWriter().write(jsonObject.get("Rows").toString());
            return CONST_RESULT_AJAX;
        }
        return CONST_RESULT_ERROR;
    }

    @Override
    public int save(ActionContext actionContext) throws Exception {
        DBDYPO indicator = new DBDYPO(TABLE_NAME, KEY_FIELD, request);
        String IId = request.getParameter(KEY_FIELD);
        int result = 0;
        if (StringUtils.isNotBlank(IId)) {
            result = DBDYDao.update(actionContext.getConnection(), indicator);
            if (result==0){
                setMessage(actionContext,"保存指标失败!");
            }else {
                setMessage(actionContext,"保存指标成功!");
            }
            return CONST_RESULT_AJAX;
        }
        return CONST_RESULT_ERROR;
    }

    @Override
    public int delete(ActionContext actionContext) throws Exception {
        return 0;
    }

    @Override
    public int goTo(ActionContext actionContext) throws Exception {
        return 0;
    }

    @Override
    public int insertExportData(ActionContext actionContext) throws Exception {
        return 0;
    }
}
