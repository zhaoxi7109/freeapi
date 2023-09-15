package com.zhaoxi.project.common;

import org.springframework.beans.factory.annotation.Autowired;

public class GetCaptcha {
    @Autowired
    private static com.aliyun.dysmsapi20170525.Client createClient;
    private static String signName;


    public static boolean getCaptcha(String phone){
        com.aliyun.dysmsapi20170525.models.SendSmsRequest sendSmsRequest = new com.aliyun.dysmsapi20170525.models.SendSmsRequest()
                .setPhoneNumbers(phone)
                .setSignName(signName);
        com.aliyun.teautil.models.RuntimeOptions runtime = new com.aliyun.teautil.models.RuntimeOptions();
        try {
            createClient.sendSmsWithOptions(sendSmsRequest, runtime);
        } catch (Exception error) {
            return false;
        }
        return true;
    }
}



